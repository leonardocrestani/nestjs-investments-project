import { NotFoundException } from "@nestjs/common";

export default function calculateOffsets(limit: number, offset: number, total: number): number {
    let offsets = (Math.ceil(total / limit));
    if (offsets === 0) {
        offsets = 1;
    }
    if (offset > offsets) {
        throw new NotFoundException(`Page ${offset} does not exists, offset cannot be greater than offsets = ${offsets}`);
    }
    return offsets;
}