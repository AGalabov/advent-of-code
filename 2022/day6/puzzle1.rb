
def solve(input)
  lines = input.split("\n")

  packet_size = 4

  lines.map{ |line| line.chars.each_cons(packet_size).find_index{ |chars| chars.uniq.length === packet_size } + packet_size }
end

puts solve(File.read('./input'))
