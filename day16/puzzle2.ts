import { max, min, sum } from 'lodash';
import { readInput } from '../utils';

class TransmissionDecoder {
  private operatorMetaBits = 7;
  private literalMetaBits = 6;

  decode(message: string) {
    const binary = this.toBinary(message);

    const { literal } = this.decodePacket(binary);
    return literal;
  }

  private toBinary(message: string) {
    return message
      .split('')
      .map((hex) => parseInt(hex, 16).toString(2).padStart(4, '0'))
      .join('');
  }

  private decodePacket(packet: string) {
    const typeId = parseInt(packet.slice(3, 6), 2);

    return this.isLiteral(typeId)
      ? this.decodeLiteral(packet)
      : this.decodeOperator(packet);
  }

  private decodeOperator(packet: string) {
    // 7th bit
    return packet[6] === '0'
      ? this.decodeOperatorType0(packet)
      : this.decodeOperatorType1(packet);
  }

  private decodeOperatorType0(packet: string) {
    const typeId = this.getTypeId(packet);

    const lengthTypeEndBit = this.operatorMetaBits + 15;
    const lengthInBits = parseInt(
      packet.slice(this.operatorMetaBits, lengthTypeEndBit),
      2
    );

    let startPosition = lengthTypeEndBit;
    const literals: number[] = [];
    while (startPosition !== lengthTypeEndBit + lengthInBits) {
      const decoded = this.decodePacket(
        packet.slice(startPosition, lengthTypeEndBit + lengthInBits)
      );
      literals.push(decoded.literal);
      startPosition += decoded.decodedBits;
    }

    const result = this.applyOperator(typeId, literals);

    return { decodedBits: startPosition, literal: result };
  }

  private decodeOperatorType1(packet: string) {
    const typeId = this.getTypeId(packet);

    let lengthTypeEndBit = this.operatorMetaBits + 11;
    const numberOfSubpackets = parseInt(
      packet.slice(this.operatorMetaBits, lengthTypeEndBit),
      2
    );

    let numberOfReadPackets = 0;
    let startingBit = lengthTypeEndBit;
    const literals: number[] = [];
    while (numberOfReadPackets < numberOfSubpackets) {
      const decoded = this.decodePacket(packet.slice(startingBit));
      literals.push(decoded.literal);
      numberOfReadPackets++;
      startingBit += decoded.decodedBits;
    }
    const result = this.applyOperator(typeId, literals);

    return { decodedBits: startingBit, literal: result };
  }

  private decodeLiteral(packet: string) {
    const packetData = packet.slice(this.literalMetaBits);

    let accumulatedNumber = '';
    let i = 0;
    while (true) {
      accumulatedNumber += packetData.slice(i + 1, i + 5);
      if (packetData[i] === '0') {
        i += 5;
        break;
      }
      i += 5;
    }
    const literal = parseInt(accumulatedNumber, 2);

    const decodedBits = this.literalMetaBits + i;

    return { literal, decodedBits };
  }

  private isLiteral(typeId: number) {
    return typeId === 4;
  }

  private getTypeId(packet: string) {
    return parseInt(packet.slice(3, 6), 2);
  }

  private applyOperator(typeId: number, literals: number[]): number {
    switch (typeId) {
      case 0:
        return sum(literals);
      case 1:
        return literals.reduce((acc, curr) => acc * curr, 1);
      case 2:
        return min(literals) as number;
      case 3:
        return max(literals) as number;
      case 5:
        return Number(literals[0] > literals[1]);
      case 6:
        return Number(literals[0] < literals[1]);
      case 7:
        return Number(literals[0] === literals[1]);
      default:
        throw new Error(`Unexpected typeId: ${typeId}`);
    }
  }
}

function solve(fileName: string) {
  const decoder = new TransmissionDecoder();

  const [line] = readInput(fileName);

  return decoder.decode(line);
}

console.log('Solution:', solve('./input'));
