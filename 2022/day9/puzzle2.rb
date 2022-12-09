require './knots'

solver = RopeBridgeKnots.new(10)

puts solver.solve(File.read('./input'))