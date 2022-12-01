

def solve(input)
  groups = input.split("\n\n")
  
  mapped = groups.map { |elf| elf.split("\n").map(&:to_i).sum }
  
  mapped.sort.reverse.take(3).sum
end

puts solve(File.read('./input'))
