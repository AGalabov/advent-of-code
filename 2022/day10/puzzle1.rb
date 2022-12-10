
def solve(input)
  instructrions = input.split("\n")

  cycle_num, value, result = 1, 1, 0

  instructrions.each do |instructrion|
    offset_cycle_num = cycle_num - 20

    if offset_cycle_num % 40 == 39 && instructrion != "noop"
      result += (cycle_num + 1) * value
    elsif offset_cycle_num % 40 == 0
      result += cycle_num * value
    end

    if instructrion == "noop"
      cycle_num += 1
    else
      # Dropping "addx "
      value += instructrion[5..-1].to_i
      cycle_num += 2
    end
  end

  result
end

puts solve(File.read('./input'))
