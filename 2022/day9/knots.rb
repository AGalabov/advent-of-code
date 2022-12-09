
class RopeBridgeKnots 
  def initialize(tail_size)
    @knot_positions = tail_size.times.map{ |_| [0,0] }

    @tail_positions = [@knot_positions.first]
  end

  def solve(input)
    input.split("\n").each { |line| track_position(line) }

    @tail_positions.uniq.length
  end

  private


  def track_position(line)
    direction, count = line.split(" ")

    count.to_i.times.each do
      move_head(direction)

      follow_tail()

      @tail_positions.push(@knot_positions.last)
    end
  end

  def move_head(direction)
    head = @knot_positions[0]

    @knot_positions[0] = case direction
      when "R" then [head.first + 1, head.last]
      when "L" then [head.first - 1, head.last]
      when "U" then [head.first, head.last + 1]
      when "D" then [head.first, head.last - 1]
    end
  end

  def follow_tail()
    @knot_positions.drop(1).each_index do |sub_index|
      index = sub_index + 1
      
      @knot_positions[index] = next_position(@knot_positions[index-1], @knot_positions[index])
    end
  end

  # TODO: Can I simplify this logic
  def next_position (head, tail)
    # Same column or row
    if head.first == tail.first || head.last == tail.last then
      if head.first - tail.first > 1
        return [tail.first + 1, head.last]
      end

      if head.first - tail.first < -1
        return [tail.first - 1, head.last]
      end


      if head.last - tail.last > 1
        return [head.first, tail.last + 1]
      end

      if head.last - tail.last < -1
        return [head.first, tail.last - 1]
      end

      return tail
    end

    # Already adjacent => no need to move
    if (head.first - tail.first).abs + (head.last - tail.last).abs < 3
      return tail;
    end

    if head.first > tail.first && head.last > tail.last
      return [tail.first + 1, tail.last + 1]
    end

    if head.first > tail.first && head.last < tail.last
      return [tail.first + 1, tail.last - 1]
    end
    
    if head.first < tail.first && head.last > tail.last
      return [tail.first - 1, tail.last + 1]
    end
    
    if head.first < tail.first && head.last < tail.last
      return [tail.first - 1, tail.last - 1]
    end
  end
end