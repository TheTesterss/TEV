<h1 align="center">
 🦫 〢 Aunt development
</h1>
<h5 align="center">
    Can misses things, please check up the README.md
<h5>

## [V0.7.0] - IMPORTATIONS & BORNED LOOPS
```diff
--- Arguments who starts with ! are required, others with ? are optionals.

+ Added $while[!condition]
---> Starts a white block.
+ Added $endWhile
---> Ends a white block.
+ Added $import[!lib;?func1;?func2;...]
---> Imports functions from a library
+ Added Maths functions
+ $sum[!num1;?num2;?num3;...]
---> Calculates the sum of given arguments.
+ $sub[!num1;?num2;?num3;...]
---> Calculates the substraction of given arguments.
+ $multi[!num1;?num2;?num3;...]
---> Calculates the multiplication of given arguments.
+ $divide[!num1;?num2;?num3;...]
---> Calculates the division of given arguments.
+ $modulo[!num1;?num2;?num3;...]
---> Calculates the modulo of given arguments.
+ $power[!num1;?num2;?num3;...]
---> Calculates the first number at the power of the given arguments.
+ $ceil[!num] / $floor[!num] / $round[!num]
---> Arounds the given argument.
+ $isNaN[!num]
---> Returns true/false whether the argument is not a number.
+ $calculate[expression]
---> Doesn't works currently with $get only with basic expressions such as "3*(5+1)"...
```

```php
# Example of while loop.
$import[maths;$sum] $c -> run "tev package add maths" to import the library.
$c -> running just $import[maths] will import every functions including useless ones so to avoid flooding memory, importing the used functions is recommended.

$stack[i;0] $c -> variable used to count.
$while[$get[i]<10]
    $stack[i;$sum[$get[i];1]]
    $log[$get[i]] $c -> Currently printing $log[i=$get[i]] will not work as text cannot be matched with functions.
$endWhile

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# 10
```

## [V0.6.0] - CONDITIONALS BLOCKS & VARIABLES
```diff
--- Arguments who starts with ! are required, others with ? are optionals.

+ Added comments "$c " 
---> ignores everything that comes after on the line.
+ $log[?content] 
---> prints a content or a blank line.
+ $stack[!name;!value] 
---> stacks a value as a defined name.
+ $get[!name] 
---> returns the stocked value as this name.
+ $if[!condition] | $elseif[!condition] | $else | $endif 
---> conditionals blocks (infos below).
+ $checkCondition[!condition]
---> returns true or false depending on the condition.
```

```php
# A family includes 4 boys, three are children, one is the parent.
$stack[age1;2]
$stack[age2;12]
$stack[age3;16]
$stack[age4;48]

$if[$get[age1]<4]
    $log[Baby]
$elseif[$get[age1]>=4 && $get[age1]<13]
    $log[Child]
$elseif[$get[age1]>=13 && $get[age1]<18]
    $log[Teen]
$else
    $log[Adult]
$endif
# This program for age1 so the 2 years old boy will returns "Baby". By replacing every "age1" inside of "$get[]" by "age3", the program will returns "Teen".
```

## [V0.5.0] - TERMINAL
```diff
- Removed everything.
+ Upgraded the command module.
+ Added included futures librairies.
```

## [V0.2.0] - VARIABLES
```diff
- Removed $ping (now $process[ping]).
+ $process[type]
+ $OS[type]
+ $stack[name;value]
+ $get[name]
! Updated the core.
```

## [V0.1.1] - CORRECTIONS
```diff
! N/A
```

## [V0.1.0] - FIRST COMMANDS
```diff
+ Added $ping.
+ Added $log[].
+ First structure example.
```

## [V0.0.1] - THE BASES
```diff
+ Pushed on github.
```