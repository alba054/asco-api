import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostClassroomAssistanceGroupPayload } from "../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { IPutAssistanceGroupPayload } from "../../utils/interfaces/request/IPutAssistanceGroupPayload";
import { IControlCardPayload } from "../../utils/interfaces/schema/IControlCardPayload";
import { AssistanceGroupService } from "./AssistanceGroupService";

export class AssistanceGroupServiceImpl extends AssistanceGroupService {
  async removeStudentFromAssistantGroup(
    groupId: string,
    username: string
  ): Promise<void> {
    const group = await this.assistanceGroupRepository.getGroupById(groupId);

    if (!group) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "group's not found");
    }

    await this.assistantGroupControlCardRepository.removeStudentFromGroupAndControlCard(
      groupId,
      username
    );
  }

  async getGroupsByPracticumIdAndUsername(
    practicumId: string,
    username: string
  ): Promise<AssistanceGroupEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return await this.assistanceGroupRepository.getGroupByPracticumIdAndUsername(
      practicumId,
      username
    );
  }

  async updateAssistanceGroupById(
    groupId: string,
    payload: IPutAssistanceGroupPayload
  ): Promise<void> {
    const group = await this.assistanceGroupRepository.getGroupById(groupId);

    if (!group) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "group's not found");
    }

    const edittedGroup = new AssistanceGroupEntity(
      payload.number ?? group.number,
      {
        assistantId: payload.mentor ?? undefined,
        studentIds: payload.mentees,
      }
    );

    await this.checkStudentsInPracticum(
      group.practicum?.id!,
      payload.mentees ?? []
    );

    const mentees: string[] = [];
    for (let i = 0; i < (payload.mentees?.length ?? 0); i++) {
      const menteeGroup =
        await this.assistanceGroupRepository.getAssistanceGroupByStudentIdAndPracticumId(
          payload.mentees![i],
          group.practicum?.id!
        );

      if (!menteeGroup) {
        mentees.push(payload.mentees![i]);
      }

      if (menteeGroup && menteeGroup.id !== groupId) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "cannot assign student to this classroom has been assigned to another classroom in this practicum"
        );
      }
    }

    await this.assistanceGroupRepository.updateGroupById(groupId, edittedGroup);

    const practicum = await this.practicumRepository.getPracticumById(
      group.practicum?.id!
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const controlCardMessagesPayload: IControlCardPayload[] = mentees.map(
      (d) => ({
        studentId: d,
        practicumId: group.practicum?.id,
        meetings: practicum.meetings.map((m) => m.id),
        groupId: groupId,
      })
    );

    this.messagingService?.publish(controlCardMessagesPayload);
  }

  async getGroupById(groupId: string): Promise<AssistanceGroupEntity> {
    const group = await this.assistanceGroupRepository.getGroupById(groupId);

    if (!group) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "group's not found");
    }

    return group;
  }

  async deleteAssistanceGroupById(groupId: string): Promise<void> {
    const group = await this.assistanceGroupRepository.getGroupById(groupId);

    if (!group) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "group's not found");
    }

    await this.assistanceGroupAssistanceRepository.deleteGroupAndAssistanceByGroupId(
      groupId
    );
  }

  async getGroupsByPracticumId(
    practicumId: string
  ): Promise<AssistanceGroupEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return await this.assistanceGroupRepository.getGroupByPracticumId(
      practicumId
    );
  }

  private async checkStudentsInPracticum(
    practicumId: string,
    students: string[]
  ) {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const practicumStudents = practicum.participants.map((p) => p.id);
    students.forEach((student) => {
      if (!practicumStudents.includes(student)) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "cannot add at least one student in your payload, unregistered in practicum"
        );
      }
    });
  }

  async addGroup(
    practicumId: string,
    payload: IPostClassroomAssistanceGroupPayload
  ): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    await this.checkStudentsInPracticum(practicumId, payload.mentees);

    for (let i = 0; i < payload.mentees.length; i++) {
      const menteeGroup =
        await this.assistanceGroupRepository.getAssistanceGroupByStudentIdAndPracticumId(
          payload.mentees[i],
          practicumId
        );

      if (menteeGroup) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "cannot assign student to this classroom has been assigned to another classroom in this practicum"
        );
      }
    }

    const group = new AssistanceGroupEntity(payload.number, {
      assistantId: payload.mentor,
      studentIds: payload.mentees,
      githubRepoLink: payload.githubRepositoryUrl,
      practicumId,
    });

    const groupPostState = await this.assistanceGroupRepository.addGroup(group);

    const controlCardMessagesPayload: IControlCardPayload[] =
      payload.mentees.map((d) => ({
        studentId: d,
        practicumId: practicumId,
        meetings: practicum.meetings.map((m) => m.id),
        groupId: groupPostState,
      }));

    if (groupPostState) {
      this.messagingService?.publish(controlCardMessagesPayload);
    }
  }
}
