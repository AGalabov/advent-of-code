
class SupplyStacks
  # Бих го направил да се подава стринг, така ако искаш можеш да му пишеш unit тестове по-лесно,
  # а разликата в извикването не е голяма
  def initialize(file_name)
    @file_name = file_name
  end

  def solve()
    input = File.read(@file_name)

    setup, instructions = input.split("\n\n")

    init_stacks(setup)

    follow_instructions(instructions)

    @stacks.map(&:last).join
  end

  private

  def init_stacks(setup)
    setup_input = setup.split("\n")

    stacks_input = setup_input.last
    
    # Може да стане с drop
    # setup_lines = setup_input[0..-2].reverse
    setup_lines = setup_input.reverse.drop(2)

    stacks = stacks_input.split(" ")

    # Прекалено много нестване на inline блокове, напиши го с multiline блок
    # @stacks = stacks.map.with_index{ |_, index| setup_lines.map{ |line| line[4*index + 1] }.filter{ |val| val != " " } }
    
    # https://ruby-doc.org/core-2.4.1/Array.html#method-i-each_index
    @stacks = stacks.each_index do |index|
      setup_lines
        .map { |line| line[4*index + 1] }
        .filter { |val| val != " " } }
    end
  end

  # Тези функции по-скоро трябва да са private
  def follow_instructions(instructions)
    # Това май не се използва никъде?
    format = /([\d]*)/

    # instr -> instruction :)
    parsed = instructions.split("\n").map { |instr| instr.scan(/\d+/).map(&:to_i) }

    parsed.each do |line|
      count, from, to = line
      count.times { @stacks[to-1].push(@stacks[from-1].pop) }
    end
  end
end

solver = SupplyStacks.new('./sample')

puts solver.solve
