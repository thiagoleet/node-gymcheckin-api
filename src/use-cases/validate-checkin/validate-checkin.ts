import { MaxDistanceError, ResourceNotFoundError } from "@/errors";
import { CheckInsRepository, GymsRepository } from "@/repositories";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { Checkin } from "@prisma/client";

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

    checkIn.validated_at = new Date();

    this.repository.save(checkIn);

    return { checkIn };
  }
}
