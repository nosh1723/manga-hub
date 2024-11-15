import { LayoutProps } from '@/models';
import React, { useEffect, useRef } from 'react';

type Point = { x: number; y: number; len?: number; r?: number; t?: number };
type SpawnedObject = ReturnType<any>;

const BGAuth = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let w: number, h: number;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { sin, cos, PI, hypot, min, max } = Math;

        function spawn() {
            const pts: Point[] = many(333, () => ({
                x: rnd(window.innerWidth),
                y: rnd(window.innerHeight),
                len: 0,
                r: 0,
            }));

            const pts2 = many(9, (i) => ({
                x: cos((i / 9) * PI * 2),
                y: sin((i / 9) * PI * 2),
            }));

            let seed = rnd(100);
            let tx = rnd(window.innerWidth);
            let ty = rnd(window.innerHeight);
            let x = rnd(window.innerWidth);
            let y = rnd(window.innerHeight);
            let kx = rnd(0.8, 0.8);
            let ky = rnd(0.8, 0.8);
            let walkRadius = pt(rnd(50, 50), rnd(50, 50));
            let r = window.innerWidth / rnd(150, 200);

            function paintPt(pt: Point) {
                pts2.forEach((pt2) => {
                    if (!pt.len) return;
                    drawLine(
                        lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
                        lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
                        x + pt2.x * r,
                        y + pt2.y * r
                    );
                });
                drawCircle(pt.x, pt.y, pt.r!);
            }

            return {
                follow(newX: number, newY: number) {
                    tx = newX;
                    ty = newY;
                },
                tick(t: number) {
                    const selfMoveX = cos(t * kx + seed) * walkRadius.x;
                    const selfMoveY = sin(t * ky + seed) * walkRadius.y;
                    let fx = tx + selfMoveX;
                    let fy = ty + selfMoveY;

                    x += min(window.innerWidth / 100, (fx - x) / 10);
                    y += min(window.innerWidth / 100, (fy - y) / 10);

                    pts.forEach((pt) => {
                        const dx = pt.x - x,
                            dy = pt.y - y;
                        const len = hypot(dx, dy);
                        let r = min(2, window.innerWidth / len / 5);
                        pt.t = 0;
                        const increasing = len < window.innerWidth / 10;
                        let dir = increasing ? 0.1 : -0.1;
                        if (increasing) r *= 1.5;
                        pt.r = r;
                        pt.len = max(0, min((pt.len ?? 0) + dir, 1));
                        paintPt(pt);
                    });
                },
            };
        }

        const spiders: SpawnedObject[] = many(1, spawn);

        window.addEventListener('pointermove', (e) => {
            spiders.forEach((spider) => spider.follow(e.clientX, e.clientY));
        });

        function animate(t: number) {
            if (!canvas) return
            if (!ctx) return;
            if (w !== window.innerWidth) w = canvas.width = window.innerWidth;
            if (h !== window.innerHeight) h = canvas.height = window.innerHeight;
            ctx.fillStyle = '#000';
            drawCircle(0, 0, w * 10);
            ctx.fillStyle = ctx.strokeStyle = '#fff';
            t /= 1000;
            spiders.forEach((spider) => spider.tick(t));
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('pointermove', (e) =>
                spiders.forEach((spider) => spider.follow(e.clientX, e.clientY))
            );
        };
    }, []);

    function rnd(x = 1, dx = 0) {
        return Math.random() * x + dx;
    }

    function drawCircle(x: number, y: number, r: number) {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawLine(x0: number, y0: number, x1: number, y1: number) {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            many(100, (i) => {
                i = (i + 1) / 100;
                let x = lerp(x0, x1, i);
                let y = lerp(y0, y1, i);
                let k = noise(x / 5 + x0, y / 5 + y0) * 2;
                ctx.lineTo(x + k, y + k);
            });
            ctx.stroke();
        }
    }

    function many<T>(n: number, f: (i: number) => T): T[] {
        return Array.from({ length: n }, (_, i) => f(i));
    }

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    function noise(x: number, y: number, t = 101) {
        let w0 = Math.sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * Math.sin(0.4 * y + -1.3 * t + 1.0));
        let w1 = Math.sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * Math.sin(0.5 * x + -1.2 * t + 0.5));
        return w0 + w1;
    }

    function pt(x: number, y: number) {
        return { x, y };
    }

    return <div>
        <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
};

export default BGAuth;
