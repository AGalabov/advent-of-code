class FallingSand
  def initialize(input)
    paths = input.split("\n")

    coordinates = paths.flat_map{ |line| line.split(" -> ")}

    @min_x = [coordinates.map{ |coords| coords.split(',')[0].to_i }.min, 500].min
    @max_x = [coordinates.map{ |coords| coords.split(',')[0].to_i }.max, 500].max

    @min_y = [coordinates.map{ |coords| coords.split(',')[1].to_i }.min, 0].min
    @max_y = [coordinates.map{ |coords| coords.split(',')[1].to_i }.max, 0].max


    x_distance = @max_x - @min_x
    y_distance = @max_y - @min_y

    @grid = Array.new(y_distance + 1).map{ |_| Array.new(x_distance + 1, ".") }

    put_at("+", 500, 0)

    paths.each do |path|
      path.split(" -> ").each_cons(2) do |from, to|
        mark_path(from.split(",").map(&:to_i), to.split(",").map(&:to_i))
      end
    end
  end

  def solve()
    counter = 0
    while place_sand() != nil
      counter += 1
    end
    # puts @grid.map(&:join)

    counter
  end

  private

  def place_sand()
    simulate_fall(500,0)
  end

  def simulate_fall(x, y)
    if(y > @max_y)
      return nil
    end

    if blocked_at?(x, y + 1)
      if blocked_at?(x - 1, y + 1)
         if blocked_at?(x+1, y+1)
          put_at("o", x, y)
          return true
         else
          return simulate_fall(x+1, y+1)
         end
      else
        return simulate_fall(x - 1, y + 1)
      end
    end

    return simulate_fall(x,y + 1)
  end

  def put_at(val, x, y)
    @grid[y-@min_y][x-@min_x] = val
  end

  def get_at(x, y)
    @grid[y-@min_y][x-@min_x]
  end

  def blocked_at?(x, y)
    if x-@min_x < 0 
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