<h1 align="center">
 🦫 〢 Aunt development
</h1>
<h5 align="center">
    Can misses things, please check up the README.md
<h5>

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