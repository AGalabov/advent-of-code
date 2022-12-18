
def adjacent?(point, other)
  ((point[0] - other[0]).abs == 1 && point[1] == other[1] && point[2] == other[2]) ||
  ((point[1] - other[1]).abs == 1 && point[0] == other[0] && point[2] == other[2]) ||
  ((point[2] - other[2]).abs == 1 && point[0] == other[0] && point[1] == other[1])
end

def solve(input)
  points = input.split("\n").map{ |line| line.split(',').map(&:to_i) }

  sides = points.map.with_index do |point, index|
    counter = 6;

    points.each_with_index do |other, other_index|
      if index != other_index && adjacent?(point, other)
        counter -= 1
      end
    end

    counter
  end


  sides.sum
end

puts solve(File.read('./input'))