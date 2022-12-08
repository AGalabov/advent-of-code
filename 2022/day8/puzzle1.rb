
class Solver 
  def initialize(input)
    @grid = input.split("\n").map { |line| line.split("").map(&:to_i) }
    @transposed = @grid.transpose
  end


  def is_visible?(i, j)
    
    return true if i == 0 || i == @grid.length - 1 || j == 0 || j == @grid[i].length - 1
    
    from_left = @grid[i][0..j-1].max < @grid[i][j]

    from_right = @grid[i][j+1..-1].max < @grid[i][j]

    from_top = @transposed[j][0..i-1].max < @transposed[j][i]
    from_bottom = @transposed[j][i+1..-1].max < @transposed[j][i]

    return from_left || from_right || from_bottom || from_top
  end

  def count_visible()
    count = 0;

    @grid.each_index do |col_i|
      @grid[col_i].each_index do |row_i|
        count += 1 if is_visible?(col_i, row_i)
      end
    end

    count    
  end


  def solve()
    count_visible()
  end
end

solver = Solver.new(File.read('./input'))

puts solver.solve()