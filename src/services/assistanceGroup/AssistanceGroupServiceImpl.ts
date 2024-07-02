import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostClassroomAssistanceGroupPayload } from "../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { IPutAssistanceGroupPayload } from "../../utils/interfaces/request/IPutAssistanceGroupPayload";
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

    const group = new AssistanceGroupEntity(payload.number, {
      assistantId: payload.mentor,
      studentIds: payload.mentees,
      practicumId,
    });

    await this.assistanceGroupRepository.addGroup(group);
  }
}
