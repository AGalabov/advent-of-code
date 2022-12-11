class Monkey
  attr_reader :items, :inspections_count

  def initialize(starting_items, operation_fn, test_fn)
    @items = starting_items
    @operation = operation_fn
    @test = test_fn
    @inspections_count = 0
  end

  def inspect()
    return nil if @items.empty?

    item = @items.shift
    @inspections_count += 1

    new_worry = @operation.call(item)
    to_throw = @test.call(new_worry)

    [new_worry, to_throw]
  end


  def add_item(item)
    @items.push(item)
  end
end


class MonkeyKeepAway
  def initialize
    @monkeys = []
    @divisors = []
  end

  def solve(input)
    fill_monkeys(input)

    @common_divisor = @divisors.reduce(&:*)

    10000.times{ |_| simulate_round() }

    sorted = @monkeys.sort_by(&:inspections_count).reverse

    sorted[0].inspections_count * sorted[1].inspections_count
  end

  private

  def simulate_round()
    @monkeys.each do |monkey|
      while result = monkey.inspect() 
        item, next_monkey = result

        item = item % @common_divisor

        @monkeys[next_monkey].add_item(item)       
      end
    end
  end

  def fill_monkeys(input)
    monkeys_input = input.split("\n\n")

    monkeys_input.each do |monkey_input|
      input = monkey_input.split("\n")
      items = input[1]["  Starting items: ".length..].split(", ").map(&:to_i)
      operation = get_operation(input[2])
      test = get_test(input[3..])

      @monkeys.push(Monkey.new(items, operation, test))
    end
  end

  def get_operation(input)
    op, arg = input["  Operation: new = old ".length..].split(" ")

    return lambda do |old|
      argument = arg == "old" ? old : arg.to_i
      
      op == "+" ? old + argument : old * argument
    end
  end

  def get_test(input)
    divisor = input[0]["  Test: divisible by ".length..].to_i
    @divisors.push(divisor)

    monkey_to_throw_divisible = input[1][-2..].to_i
    monkey_to_throw_not_divisible = input[2][-2..].to_i

    return lambda do |priority|
      priority % divisor == 0 ? monkey_to_throw_divisible : monkey_to_throw_not_divisible
    end
  end

end

solver = MonkeyKeepAway.new

puts solver.solve(File.read('./input'))
