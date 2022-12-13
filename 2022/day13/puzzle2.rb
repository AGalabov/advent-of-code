require './sample.rb'

def right_order_helper?(first, second)
  if (first.is_a? Integer) && (second.is_a? Integer)
    return nil if first == second
    
    return first <= second
  end

  if (first.is_a? Array) && (second.is_a? Array)
    if first.empty?
      return nil if second.empty?

      return true
    end

    return false if second.empty?

    head_order = right_order_helper?(first.first, second.first)

    return head_order unless head_order == nil

    return right_order_helper?(first.drop(1), second.drop(1))
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
  full_input = input.push([[2]]).push([[6]])

  res = full_input.sort do |first, second|
    right_order?(first, second) ? -1 : 1
  end

  index1 = res.find_index([[2]]) + 1
  index2 = res.find_index([[6]]) + 1
  
  index1 * index2

end

puts solve(Input::DATA['input'])