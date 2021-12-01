#include <iostream>
#include <fstream>


int main() {
  unsigned int numberOfIncreases = 0;

  std::ifstream in;
  in.open("input.txt");

  int lastMeasurement;
  int curr;
  in >> curr;
  lastMeasurement = curr;

  do {
    if(curr > lastMeasurement) {
        numberOfIncreases++;
    }
    lastMeasurement = curr;
  } while(in >> curr);

  in.close();

  std::cout << numberOfIncreases;
}