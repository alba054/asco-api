import { USER_ROLE } from "@prisma/client";
import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostClassroomAssistanceGroupPayload } from "../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { IPutAssistanceGroupPayload } from "../../utils/interfaces/request/IPutAssistanceGroupPayload";
import { IControlCardPayload } from "../../utils/interfaces/schema/IControlCardPayload";
import { AssistanceGroupService } from "./AssistanceGroupService";

export class AssistanceGroupServiceImpl extends AssistanceGroupService {
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

    await this.assistanceGroupRepository.updateGroupById(groupId, edittedGroup);
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

    await this.assistanceGroupRepository.deleteGroupById(groupId);
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
