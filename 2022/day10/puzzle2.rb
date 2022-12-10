
def mark_pixel(result_map, cycle_num, value)
  row = cycle_num / 40
  col = cycle_num % 40

  result_map[row][col] = (col - value).abs <= 1 ? "#" : "."
end

def solve(input)
  instructrions = input.split("\n")

  result_map =  (1..6).map { |_| Array.new(40, "") }

  cycle_num, value, result = 0, 1, 0

  instructrions.each do |instructrion|
    mark_pixel(result_map, cycle_num, value)

    # no matter the instruction
    cycle_num += 1

    if instructrion.start_with?("addx")
      # in case of addx we need to mark the next pixel/cycle as well
      mark_pixel(result_map, cycle_num, value)
      
      value += instructrion[5..-1].to_i
      cycle_num += 1
    end
  end

  result_map.map(&:join).join("\n")
end

puts solve(File.read('./input'))
