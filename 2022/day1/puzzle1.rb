
def solve(input)
  groups = input.split("\n\n")
  groups.map { |elf| elf.split("\n").map(&:to_i).sum }.max  
end

puts solve(File.read('./input'))
