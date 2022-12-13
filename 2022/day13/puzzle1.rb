require './sample.rb'

def right_order_helper?(first, second)
  if (first.is_a? Integer) && (second.is_a? Integer)
    return nil if first == second

    return first < second
  end

  if (first.is_a? Array) && (second.is_a? Array)
    if first.empty?
      return nil if second.empty?
      
      return true
    end

    return false if second.empty?

    first_head = first.shift
    second_head = second.shift

    head_order = right_order_helper?(first_head, second_head)

    return head_order unless head_order == nil

    return right_order_helper?(first, second)
  end

  if first.is_a? Integer
    return right_order_helper?([first], second)
  end


  if second.is_a? Integer
    return right_order_helper?(first, [second])
  end
end

def right_order?(first, second)
  result = right_order_helper?(first, second)
  result == nil ? true : result
end

def solve(input)
  res = input.each_slice(2).map.with_index do |elem, index|
    first, second = elem

    right_order?(first, second) ? index + 1 : 0
  end
  
  res.reduce(&:+)
end

puts solve(Input::DATA['input'])
