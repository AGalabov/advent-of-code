
def calculate_result(outcome)
  outcome == 'X' ? 0 : outcome == 'Y' ? 3 : 6
end

def calculate_mine(opponent, outcome)
  case [opponent, outcome]
    when ['A', 'Y'], ['B', 'X'], ['C', 'Z'] then 1
    when ['A', 'Z'], ['B', 'Y'], ['C', 'X'] then 2
    else 3
  end
end

def calculate(opponent, outcome)
  calculate_mine(opponent, outcome) + calculate_result(outcome)
end

def solve(input)
  rounds = input.split("\n")
  rounds.map { |line| line.split(" ") }.map { |opponent, outcome| calculate(opponent, outcome) }.sum  
end

puts solve(File.read('./input'))
