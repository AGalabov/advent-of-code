class SupplyStacks
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
    setup_lines = setup_input[0..-2].reverse

    stacks = stacks_input.split(" ")

    @stacks = stacks.map.with_index do |_, index|
      setup_lines
        .map{ |line| line[4*index + 1] }
        .filter{ |val| val != " " }
    end
  end

  def follow_instructions(instructions)
    parsed = instructions.split("\n").map { |instruction| instruction.scan(/\d+/).map(&:to_i) }

    parsed.each do |line|
      count, from, to = line
      count.times { @stacks[to-1].push(@stacks[from-1].pop) }
    end
  end
end

solver = SupplyStacks.new('./input')

puts solver.solve

