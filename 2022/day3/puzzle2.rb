def get_badge (group)
  group.map(&:chars).reduce(&:intersection).first
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

  groups = bags.each_slice(3)

  groups.map(&method(:get_badge)).map(&method(:get_priority)).sum
end

puts solve(File.read('./input'))
