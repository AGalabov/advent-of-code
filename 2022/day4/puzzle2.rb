
def check(first, second)
  start1, end1 = first.split('-').map(&:to_i)
  start2, end2 = second.split('-').map(&:to_i)

  range1 = (start1..end1).to_a
  range2 = (start2..end2).to_a

  range1.intersection(range2).length > 0
end

def solve(input)
  lines = input.split("\n")
  lines.map { |line| line.split(",") }.filter { |first, second| check(first, second) }.length  
end

puts solve(File.read('./input'))
