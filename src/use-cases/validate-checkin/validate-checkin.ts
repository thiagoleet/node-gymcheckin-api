import { LateCheckInValidateError, ResourceNotFoundError } from "@/errors";
import { CheckInsRepository } from "@/repositories";
import { Checkin } from "@prisma/client";
import dayjs from "dayjs";

type ValidateCheckInUseCaseProps = {
  checkInId: string;
};

type ValidateCheckInUseCaseResponse = {
  checkIn: Checkin | null;
};

export class ValidateCheckInUseCase {
  constructor(private repository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseProps): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.repository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError();
    }

    checkIn.validated_at = new Date();

    this.repository.save(checkIn);

    return { checkIn };
  }
}
