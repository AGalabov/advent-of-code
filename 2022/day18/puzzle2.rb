AIR = "A"
LAVA = "L"
OUTSIDE_AIR = "O"
CAPACITY = 24

def num_free_edges(point, grid)
    x,y,z = point
    counter = 0;
    if grid[x-1][y][z] == AIR then counter += 1 end 
    if grid[x+1][y][z] == AIR then counter += 1 end 
    if grid[x][y-1][z] == AIR then counter += 1 end 
    if grid[x][y+1][z] == AIR then counter += 1 end 
    if grid[x][y][z-1] == AIR then counter += 1 end 
    if grid[x][y][z+1] == AIR then counter += 1 end 
    counter
end

def in_contact(grid, x,y,z)
    return true if grid[x-1][y][z] == OUTSIDE_AIR
    return true if grid[x+1][y][z] == OUTSIDE_AIR
    return true if grid[x][y-1][z] == OUTSIDE_AIR
    return true if grid[x][y+1][z] == OUTSIDE_AIR
    return true if grid[x][y][z-1] == OUTSIDE_AIR
    return true if grid[x][y][z+1] == OUTSIDE_AIR

    return false
end

def flood(grid)
  while true
    did_make_change = false

    CAPACITY.times do |x|
      CAPACITY.times do |y|
        CAPACITY.times do |z|
          if grid[x][y][z] == AIR && in_contact(grid, x,y,z)
            grid[x][y][z] = OUTSIDE_AIR
            did_make_change = true
          end
        end
      end
    end

    break unless did_make_change
  end

end

def solve(input)
  grid = Array.new(CAPACITY).map{ |_| Array.new(CAPACITY).map { |_| Array.new(CAPACITY).fill(AIR)} }
  
  droplets = input.split("\n").map{ |line| line.split(',').map(&:to_i) }

  droplets.each{ |x,y,z| grid[x][y][z]=LAVA }

  all_free_sides = droplets.map{ |droplet| num_free_edges(droplet, grid) }.sum

  CAPACITY.times do |index1|
    CAPACITY.times do |index2|
      grid[0][index1][index2] = OUTSIDE_AIR
      grid[CAPACITY-1][index1][index2] = OUTSIDE_AIR

      grid[index1][0][index2] = OUTSIDE_AIR
      grid[index1][CAPACITY-1][index2] = OUTSIDE_AIR


      grid[index1][index2][0] = OUTSIDE_AIR
      grid[index1][index2][CAPACITY-1] = OUTSIDE_AIR
    end
  end

  flood(grid)


  pocket_sides = droplets.map{ |droplet| num_free_edges(droplet, grid) }.sum
  
  exterior_sides = all_free_sides - pocket_sides
end

puts solve(File.read('./input'))