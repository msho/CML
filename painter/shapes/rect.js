import './shape.js'

class Rect extends Shape {
    constructor(context, parent, width, height, settings) {
        super(context);

        this.width = handleUnits(width);
        this.height = handleUnits(height);
        this.settings = settings;
    }

    draw() {
        const ctx = this.context,
            cornerRadius = this.settings.cornerRadius(),
            width = this.width,
            height = this.height;

        ctx.beginPath();

        if (!cornerRadius) {
            ctx.rect(0, 0, width, height);
        } else {
            const corners = this.getCorners();

            ctx.moveTo(corners.topLeft, 0);
            
            ctx.lineTo(width - corners.topRight, 0);
            ctx.arc(width - corners.topRight, corners.topRight, corners.topRight, (Math.PI * 3) / 2, 0);

            ctx.lineTo(width, height - corners.bottomRight);
            ctx.arc(width - corners.bottomRight, height - corners.bottomRight, corners.bottomRight, 0, Math.PI / 2);

            ctx.lineTo(corners.bottomLeft, height);
            ctx.arc(corners.bottomLeft, height - corners.bottomLeft, corners.bottomLeft, Math.PI / 2, Math.PI);

            ctx.lineTo(0, corners.topLeft);
            ctx.arc(corners.topLeft, corners.topLeft, corners.topLeft, Math.PI, (Math.PI * 3) / 2);
        }
        ctx.closePath();
        ctx.fillStrokeShape(this);
    } // draw

    getCorners() {
        let corners;
        if (typeof cornerRadius === 'number') {
            const allCorners = this.getCornerRadius(cornerRadius);
            corners = { topLeft: allCorners, topRight: allCorners, bottomRight: allCorners, bottomLeft: allCorners };
        } else {
            corners = {
                topLeft: this.getCornerRadius(cornerRadius[0]),
                topRight: this.getCornerRadius(cornerRadius[1]),
                bottomRight: this.getCornerRadius(cornerRadius[2]),
                bottomLeft: this.getCornerRadius(cornerRadius[3])
            }
        }

        return corners;
    } // getCorners


    getCornerRadius(cornerRadius) {
        return Math.min(cornerRadius);
    }
}

export default Rect
