class FallingSand
  def initialize(input)
    paths = input.split("\n")

    coordinates = paths.flat_map{ |line| line.split(" -> ")}

    @min_x = [coordinates.map{ |coords| coords.split(',')[0].to_i }.min, 500].min
    @max_x = [coordinates.map{ |coords| coords.split(',')[0].to_i }.max, 500].max

    @min_y = [coordinates.map{ |coords| coords.split(',')[1].to_i }.min, 0].min
    @max_y = [coordinates.map{ |coords| coords.split(',')[1].to_i }.max, 0].max

    @offset = 150

    x_distance = @max_x - @min_x + 1 + @offset*2
    # +2 for the added layer from the task.
    y_distance = (@max_y - @min_y) + 1 + 2

    @grid = Array.new(y_distance).map{ |_| Array.new(x_distance, ".") }

    put_at("+", 500, 0)

    paths.each do |path|
      path.split(" -> ").each_cons(2) do |from, to|
        mark_path(from.split(",").map(&:to_i), to.split(",").map(&:to_i))
      end
    end

    @grid[@grid.length - 1].fill("#")
  end

  def solve()
    counter = 0
    while place_sand() != nil
      counter += 1
    end

    # puts @grid.map(&:join)

    # +1 for the final blocking sand
    counter + 1
  end

  private

  def place_sand()
    simulate_fall(500,0)
  end

  def simulate_fall(x, y)
    if(y > @max_y + 2 - 1)
      return nil
    end

    if blocked_at?(x, y + 1)
      if blocked_at?(x - 1, y + 1)
         if blocked_at?(x+1, y+1)
          return nil if get_at(x,y) == "+"
          put_at("o", x, y)
          return true
         else
          return simulate_fall(x+1, y+1)
         end
      else
        return simulate_fall(x - 1, y + 1)
      end
    end

    res = simulate_fall(x,y + 1)
    return res
  end

  def put_at(val, x, y)
    @grid[y-@min_y][(x-@min_x) + @offset] = val
  end

  def get_at(x, y)
    @grid[y-@min_y][(x-@min_x) + @offset]
  end

  def blocked_at?(x, y)
    if (x-@min_x) + @offset < 0 
      return nil
    end

    get_at(x, y) != "."
  end

  def mark_path(from, to)
    if(from[0] == to[0])
      min = [from[1], to[1]].min
      max = [from[1], to[1]].max

      (max-min + 1).times do |index|
        put_at("#", from[0], min + index)
      end
    else
      min = [from[0], to[0]].min
      max = [from[0], to[0]].max

      (max-min + 1).times do |index|
        put_at("#", min + index, from[1])
      end
    end
  end


end

solver = FallingSand.new(File.read('./input'))

puts solver.solve()

#3490 is too low