import { Injectable } from "@nestjs/common";

@Injectable()
export class MedicationService {
    getMedication(): string {
        return 'This is medication service!';
      }
}