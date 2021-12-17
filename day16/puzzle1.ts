import { readInput } from '../utils';

class TransmissionDecoder {
  private operatorMetaBits = 7;
  private literalMetaBits = 6;
  private packetVersionSum = 0;

  decode(message: string) {
    const binary = this.toBinary(message);

    this.decodePacket(binary);
    return this.packetVersionSum;
  }

  private toBinary(message: string) {
    return message
      .split('')
      .map((hex) => parseInt(hex, 16).toString(2).padStart(4, '0'))
      .join('');
  }

  private decodePacket(packet: string): { decodedBits: number } {
    const version = parseInt(packet.slice(0, 3), 2);
    const typeId = parseInt(packet.slice(3, 6), 2);

    this.packetVersionSum += version;

    return this.isLiteral(typeId)
      ? this.decodeLiteral(packet)
      : this.decodeOperator(packet);
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

  private decodeOperator(packet: string) {
    // 7th bit
    return packet[6] === '0'
      ? this.decodeOperatorType0(packet)
      : this.decodeOperatorType1(packet);
  }

  private decodeOperatorType0(packet: string) {
    const lengthTypeEndBit = this.operatorMetaBits + 15;
    const lengthInBits = parseInt(
      packet.slice(this.operatorMetaBits, lengthTypeEndBit),
      2
    );

    let startPosition = lengthTypeEndBit;
    while (startPosition !== lengthTypeEndBit + lengthInBits) {
      const decoded = this.decodePacket(
        packet.slice(startPosition, lengthTypeEndBit + lengthInBits)
      );
      startPosition += decoded.decodedBits;
    }
    return { decodedBits: startPosition };
  }

  private decodeOperatorType1(packet: string) {
    let lengthTypeEndBit = this.operatorMetaBits + 11;
    const numberOfSubpackets = parseInt(
      packet.slice(this.operatorMetaBits, lengthTypeEndBit),
      2
    );

    let numberOfReadPackets = 0;
    let startingBit = lengthTypeEndBit;
    while (numberOfReadPackets < numberOfSubpackets) {
      const decoded = this.decodePacket(packet.slice(startingBit));
      numberOfReadPackets++;
      startingBit += decoded.decodedBits;
    }
    return { decodedBits: startingBit };
  }

  private isLiteral(typeId: number) {
    return typeId === 4;
  }
}

function solve(fileName: string) {
  const decoder = new TransmissionDecoder();

  const [line] = readInput(fileName);

  return decoder.decode(line);
}

console.log('Solution:', solve('./input'));
