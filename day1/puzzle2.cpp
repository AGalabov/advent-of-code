#include <iostream>
#include <fstream>


int main() {
  unsigned int numberOfIncreases = 0;

  std::ifstream in;
  in.open("input.txt");

  int first, second, third, lastMeasurement;
  in >> first >> second >> third;
  lastMeasurement = first + second + third;

  do {
    if(first + second + third > lastMeasurement) {
        numberOfIncreases++;
    }
    lastMeasurement = first + second + third;
    first = second;
    second = third;
  } while(in >> third);

  in.close();

  std::cout << numberOfIncreases;
}