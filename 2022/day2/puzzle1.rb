
def calculate_result(opponent, me)
  case [opponent, me]
    when ['A', 'Y'], ['B', 'Z'], ['C', 'X'] then 6
    when ['A', 'X'], ['B', 'Y'], ['C', 'Z'] then 3
    else 0
  end
end

def calculate_mine(me)
  me == 'X' ? 1 : me == 'Y' ? 2 : 3
end


def calculate(opponent, me)
  calculate_result(opponent, me) + calculate_mine(me)
end

def solve(input)
  rounds = input.split("\n")
  rounds.map { |line| line.split(" ") }.map { |opponent, me| calculate(opponent, me) }.sum  
end

puts solve(File.read('./input'))
