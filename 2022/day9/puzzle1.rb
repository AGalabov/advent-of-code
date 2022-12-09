require './knots'

solver = RopeBridgeKnots.new(2)

puts solver.solve(File.read('./input'))