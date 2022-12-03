
def get_missing (line)
  first, second = line.chars.each_slice(line.size / 2).map(&:to_a)

  first.intersection(second).first
end

def get_priority (char)
  if char in 'a'..'z'
    char.ord - 'a'.ord + 1
  else
    char.ord - 'A'.ord + 27
  end
end

def solve(input)
  bags = input.split("\n")
  bags.map(&method(:get_missing)).map(&method(:get_priority)).sum
end

puts solve(File.read('./input'))
