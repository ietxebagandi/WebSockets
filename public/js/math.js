export default class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get(target, prop) {
        return this[prop] || 'MAGIC';
    }

    add(other){
        // si other es una instancia de Vec2D
        // anyadir other a this como vector
        if(other instanceof Vec2D){
            this.x = this.x+other.x;
            this.y = this.y+other.y;
        }
        // si no,
        // anyadir other a this como escalar
        //
        else{
            this.x *= other;
            this.y *= other;
        }
        // devolver this
        return this;
    }

    _mul(other){
        // devolver un nuevo vector igual a
        // this multiplicado por el escalar other
        return new Vec2D(this.x*other,this.y*other);
    }

    equals(other) {
        // devuelve true si this es aproximadamente igual a other (igual con una diferencia máxima de epsilon=0.1
        return (Math.abs(other.x - this.x) <= 0.1) && (Math.abs(other.y - this.y) <= 0.1);
    }

    static approx_equal(a, b, epsilon) {
        // devuelve true si a aprox. igual a b
        // iguales salvo una diferencia absoluta
        // máxima de epsilon
        let a0 = a[0],
            a1 = a[1];
        let b0 = b[0],
            b1 = b[1];
        return (
            Math.abs(a0 - b0) <=
            epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <=
            epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
        );
    }
}
export { Vec2D };

// clase Object2D. Representa un objeto 2D caracterizado por un vector size
// (diagonal del rectángulo que circunscribe el objeto) y una posición
// superior izquierda x,y.

class Object2D {

    constructor(size, position){
        this.size = size;
        this.position = position;
    }

    get x(){
        return this.position.x;
    }

    get y(){
        return this.position.y;
    }

    get width(){
        return this.size.x;
    }

    get height(){
        return this.size.y;
    }

}

export { Object2D };



