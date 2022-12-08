
class Solver 
  def initialize(input)
    @grid = input.split("\n").map { |line| line.split("").map(&:to_i) }
    @transposed = @grid.transpose
  end


  def score(i, j)
    # A little bit of a cheat/hack to simplify the calculations. The score would not necessarily be
    # 1 but it shouldn't be the best scenic score anyways! 
    return 1 if i == 0 || i == @grid.length - 1 || j == 0 || j == @grid[i].length - 1
    
    to_check_left = @grid[i][0..j-1].reverse
    from_left = to_check_left.take_while { |tree| tree < @grid[i][j] }.length
    score_left =  from_left == to_check_left.length ? from_left : from_left + 1 

    
    to_check_right = @grid[i][j+1..-1]
    from_right = to_check_right.take_while { |tree| tree < @grid[i][j] }.length
    score_right = from_right == to_check_right.length ? from_right : from_right +1

    
    to_check_top = @transposed[j][0..i-1].reverse
    from_top = to_check_top.take_while { |tree| tree < @transposed[j][i] }.length
    score_top = from_top == to_check_top.length ? from_top : from_top +1
    
    to_check_bottom = @transposed[j][i+1..-1]
    from_bottom = to_check_bottom.take_while { |tree| tree < @transposed[j][i] }.length
    score_bottom = from_bottom == to_check_bottom.length ? from_bottom : from_bottom +1

    return score_left * score_right * score_bottom * score_top
  end

  def scenic_score()
    max = 0;

    @grid.each_index do |col_i|
      @grid[col_i].each_index do |row_i|
        score = score(col_i, row_i)
        max = score if score > max
      end
    end

    max    
  end


  def solve()
    scenic_score()
  end
end

solver = Solver.new(File.read('./input'))

puts solver.solve()