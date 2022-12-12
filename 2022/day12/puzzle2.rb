class HillClimbing
  def initialize(input)
    @grid = input.split("\n").map{ |line| line.split("") }
  end

  def solve()
    starting_positions = find_starting_positions()

    copied_grid = @grid.map(&:dup)

    min_path = @grid.length * @grid[0].length

    starting_positions.each do |position|
      @grid = copied_grid.map(&:dup)
      path_length = find_min_path(position[0], position[1])

      if path_length != nil && path_length < min_path
        min_path = path_length
      end
    end
    
    min_path
  end

  private

  def find_starting_positions()
    starting_positions = []

    @grid.each_with_index do |row, row_index|
      row.each_with_index do |col, col_index|
        if col == "a" || col == "S"
          starting_positions.push([row_index, col_index])
        end
      end
    end

    starting_positions
  end

  def find_min_path(row, col)
    queue = [[row, col, 0]]

    while !queue.empty? do
      node_row, node_col, path_length = queue.shift

      if(@grid[node_row][node_col] == "E")
        return path_length
      end

      options = possible_options(node_row, node_col)

      @grid[node_row][node_col] = "*"

      options.each do |next_row, next_col|
        queue.push([next_row, next_col, path_length + 1])
      end
    end

    return nil
  end


  def possible_options(row, col)
    all_options = [[row + 1, col], [row, col + 1], [row - 1, col], [row, col - 1]]

    all_options.filter do |r, c|
      in_bounds?(r, c) && !visited?(r, c)  && order(r, c) - order(row, col) <= 1
    end
  end

  def order(row, col)
    case @grid[row][col]
      when "S" then "a".ord
      when "E" then "z".ord
      else @grid[row][col].ord
    end
  end

  def in_bounds?(row, col)
    row >= 0 && row <= @grid.length - 1 && col >= 0 && col <= @grid[0].length - 1
  end

  def visited?(row, col)
    @grid[row][col] == "*" 
  end
end

solver = HillClimbing.new(File.read('./input'))

puts solver.solve()