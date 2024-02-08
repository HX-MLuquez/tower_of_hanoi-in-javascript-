# TORRE de HANOI en JS

The algorithm of the tower of hanoi in javascript 
Explained its flow, its logical operation. 
The calculation to know the minimum movements and graphics 
that clarify its recursion. Also a version of this function 
that lists the movements.

El algoritmo de la torre de hanoi en javascript 
Explicado su flujo, su funcionamiento lógico -> https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-

El cálculo para saber los movimientos mínimos y gráficos 
que aclaran su recursividad. Además una versión de dicha 
función que nos enumera los movimientos.

```
               ORIGEN       
                  ▄                ███               ███
                 ▄▄▄               ███               ███
                ▄▄▄▄▄              ███               ███
                  A                 B                 C     
            █████████████     █████████████     █████████████         
                ORIGEN 

Cantidad inicial de aros en A =   3
```

## GRÁFICO

```js
     -------------------->>>  TORRE DE HANOI  <<<---------------------
         La cantidad de movimientos mínimos se calculan como: 2^n - 1

con 3 anillos son    (3                   + 1 +            3)           = 7 movimientos
                                        /       \
                                       /         \
                                      /           \
                                     /             \
                                    /               \
                                   /                 \
                                  /                   \
                                 /                     \
                                /                       \
                               /                         \
                              /                           \
con 4 anillos son         (3+1+3)         + 1 +         (3+1+3)         = 15 movimientos
                           /  \                          /  \
                          /    \                        /    \
                         /      \                      /      \
                        /        \                    /        \
                       /          \                  /          \
                      /            \                /            \
con 5 anillos son ((3+1+3) + 1 + (3+1+3)) + 1 + ((3+1+3) + 1 + (3+1+3)) = 31 movimientos
etc...
```

## FLOW del CODE

The flow of the program is:

Primero considerar que el orden de la torre es:
```js
                     Los 2 anillos primeros de la torre
                //===================\\   Los 2 últimos anillos de la torre
                           //========================\\
                 ORIGEN       AUXILIAR       DESTINO
                   ||           ||             ||
                   ||           ||             ||
                   ||           ||             ||
Inicialmente son    A           B               C     y luego estos valores se van intercambiando
                  =====        =====          =====
                  =====        =====          =====
```

- Etapas del código:

### FLOW CODE:
```js
tower_hanoi(n, origen, auxiliar, destino) --> tower_hanoi(3, A, B, C)
tower_hanoi(3-1, A, B, C) pending 1
tower_hanoi(2, A, C, B)
tower_hanoi(2-1, A, C, B) pending 2
tower_hanoi(1, A, B, C) se resuelve
console.log ("Mover de A a C")
tower_hanoi(2-1, A, C, B) avanza pending 2
console.log("Mover de A a B") avanza pending 2
tower_hanoi(2-1, C, A, B) avanza pending 2
tower_hanoi(1, C, A, B) se resuelve
console.log("Mover de C a B")
tower_hanoi(3-1, A, B, C) avanza pending 1
console.log("Mover de A a C") avanza pending 1
tower_hanoi(3-1, B, A, C) avanza pending 1
tower_hanoi(2, B, A, C) pending sub 1
tower_hanoi(2-1, B, C, A) avanza pending 1
tower_hanoi(1, B, C, A) se resuelve
console.log("Mover de B a A")
tower_hanoi(2-1, B, A, C) avanza pending sub 1
console.log("Mover de B a C") avanza pending sub 1
tower_hanoi(2-1, A, B, C) avanza pending sub 1
tower_hanoi(1, A, B, C) se resuelve
console.log("Mover de A a C")
```

Cant.= cantidad de movimientos mínimos que se calculan como: 2^n - 1 , siendo n la cantidad
de anillos y considerando que siempre inician todos en un mismo lugar de origen y se deben
mover todos a un mismo lugar de destino.
```
Cant./ con 3 anillos    con 4 anillos      con 5 anillos     con 2 anillos
1   Mover de A a C     Mover de A a B     Mover de A a C     Mover de A a B
2   Mover de A a B     Mover de A a C     Mover de A a B     Mover de A a C
3   Mover de C a B     Mover de B a C     Mover de C a B     Mover de B a C
4   Mover de A a C     Mover de A a B     Mover de A a C
5   Mover de B a A     Mover de C a A     Mover de B a A
6   Mover de B a C     Mover de C a B     Mover de B a C
7   Mover de A a C     Mover de A a B     Mover de A a C
8                      Mover de A a C     Mover de A a B
9                      Mover de B a C     Mover de C a B
10                     Mover de B a A     Mover de C a A
11                     Mover de C a A     Mover de B a A
12                     Mover de B a C     Mover de C a B
13                     Mover de A a B     Mover de A a C
14                     Mover de A a C     Mover de A a B
15                     Mover de B a C     Mover de C a B
16                                        Mover de A a C
17                                        Mover de B a A
18                                        Mover de B a C
19                                        Mover de A a C
20                                        Mover de B a A
21                                        Mover de C a B
22                                        Mover de C a A
23                                        Mover de B a A
24                                        Mover de B a C
25                                        Mover de A a C
26                                        Mover de A a B
27                                        Mover de C a B
28                                        Mover de A a C
29                                        Mover de B a A
30                                        Mover de B a C
31                                        Mover de A a C
32                                     -------- etc
```