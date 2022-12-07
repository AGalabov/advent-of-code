def find_directory_indices(lines)
  lines
    .map.with_index { |line, index| /^\$ cd [\/a-z]+/.match?(line) ? index : nil }
    .compact
end

def find_volume(index_of_entry, lines)
  volume = 0
  current_depth = 0
  
  rest_of_lines = lines[index_of_entry..-1]

  rest_of_lines.each do |line|
    if line == "$ cd .." then
      current_depth -= 1
      return volume if current_depth == 0
    elsif line.start_with?("$ cd") then
      current_depth += 1
    end

    volume += line.scan(/^\d+/).first.to_i
  end

  volume
end


def solve(input)
  lines = input.split("\n")

  directory_indices = find_directory_indices(lines)

  volumes = directory_indices.map { |index| find_volume(index, lines) }

  space_left = 70000000 - volumes.max

  space_needed = 30000000 - space_left

  # puts "Left: #{space_left}, Needed: #{space_needed}"

  volumes.filter { |volume| volume >= space_needed}.min
end

puts solve(File.read('./input'))