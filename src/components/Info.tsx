import React from 'react';
import './Info.css'

interface IInfo {
    color: string,
    position: [number, number]
}

const Info: React.FC<IInfo> = ({ color, position }) => {

    const colorNames: string[] = ['RGB', 'HEX', 'HSL', 'HWB'];
    const colors: string[] = [rgbaToRgb(color), rgbaToHex(color), rgbaToHsl(color), rgbaToHwb(color)]

    function onCopy(id: string) {
        const copied: HTMLSpanElement | null = document.getElementById(id);
        copied?.focus();
        if (copied) {
            const span: HTMLSpanElement | null = document.getElementById("span " + id);
            navigator.clipboard.writeText(copied.innerText);
            span?.classList.add('show');
            setTimeout(() => {
                span?.classList.remove('show');
            }, 1000)
        }

    }

    function rgbaToHex(color: string) {
        const rgba: string[] = color.slice(color.indexOf('(') + 1, color.length - 1).split(',');
        const red: string = Number(rgba[0]).toString(16);
        const green: string = Number(rgba[1]).toString(16);
        const blue: string = Number(rgba[2]).toString(16);
        const alpha: string = Number(rgba[3]).toString(16);
        if (rgba[3] === '255') {
            return '#' + [red, green, blue].join('')
        }
        return '#' + [red, green, blue, alpha].join('')
    }

    function rgbaToRgb(color: string) {
        const alpha: string = color.slice(color.indexOf('(') + 1, color.length - 1).split(',')[3];
        const alphaFr: number = Number(alpha) / 255;
        const rgb: String = color.slice(color.indexOf('('), color.lastIndexOf(','));
        if (alphaFr === 1) {
            return 'rgb' + rgb + ')'
        }
        return 'rgba(' + rgb + ',' + alphaFr + ')'
    }

    function getHue(maximum: number, minimum: number, r: number, g: number, b: number) {
        const diff: number = maximum - minimum;
        let h: number;

        if (maximum === minimum) {
            h = 0;
        } else
            if (maximum === r && g >= b) {
                h = 60 * ((g - b) / diff);
            } else
                if (maximum === r && g < b) {
                    h = 60 * ((g - b) / diff) + 360;
                } else
                    if (maximum === g) {
                        h = 60 * ((b - r) / diff) + 120;
                    }
                    else {
                        h = 60 * ((r - g) / diff) + 240;
                    };
        return h

    }

    function rgbaToHsl(color: string) {
        const rgba: number[] = color.slice(color.indexOf('(') + 1, color.length - 1).split(',').map(col => Number(col));
        const maximum: number = Math.max(...rgba.slice(0, 3));
        const minimum: number = Math.min(...rgba.slice(0, 3));
        const r: number = rgba[0];
        const g: number = rgba[1];
        const b: number = rgba[2];
        const alpha: number = rgba[3];
        const alphaFr: number = alpha / 255;

        let h: number;
        h = getHue(maximum, minimum, r, g, b);
        let l: number = (maximum / 255 + minimum / 255) / 2;

        let s: number = 0;

        if ((l !== 0) && (l !== 1)) {
            s = (maximum / 255 - l) / Math.min(l, Math.abs(1 - l));
        };

        h = Math.round(h);
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        if (alphaFr === 1) {
            return 'hsl(' + h + ', ' + [s, l].map(cmpnt => String(cmpnt) + '%').join(', ') + ')'
        }
        return 'hsla(' + h + ', ' + [s, l].map(cmpnt => String(cmpnt) + '%').join(', ') + ', ' + alphaFr + ')'
    }

    function rgbaToHwb(color: string) {
        const rgba: number[] = color.slice(color.indexOf('(') + 1, color.length - 1).split(',').map(col => Number(col));
        const maximum: number = Math.max(...rgba.slice(0, 3));
        const minimum: number = Math.min(...rgba.slice(0, 3));
        const r: number = rgba[0];
        const g: number = rgba[1];
        const b: number = rgba[2];
        const alpha: number = rgba[3];
        const alphaFr: number = alpha / 255;

        let h: number;
        h = getHue(maximum, minimum, r, g, b)

        let w: number = minimum / 255;

        let bl: number = 1 - maximum / 255;

        h = Math.round(h);
        w = Math.round(w * 100);
        bl = Math.round(bl * 100);

        if (alphaFr === 1) {
            return 'hsl(' + h + ', ' + [w, bl].map(cmpnt => String(cmpnt) + '%').join(', ') + ')'
        }
        return 'hsla(' + h + ', ' + [w, bl].map(cmpnt => String(cmpnt) + '%').join(', ') + ', ' + alphaFr + ')'
    }

    function renderColorCh(name: string, value: string, index: number) {
        return <div key={index + "color-characteristic"} className='ch'>
            <label className='ch-name'>{name}</label>
            <div className='ch-r'>
                <span id={'val' + index} className='ch-value'>{value}</span>
                <img onClick={() => onCopy("val" + index)} className='copy-icon' alt='copy' src='./copy.svg'></img>
                <span id={'span val' + index} className='copied'>copied</span>
            </div>
        </div>
    }

    return (
        <div className='info-container'>
            <div className='color-square' style={{ "backgroundColor": color }}></div>
            <div className='characteristics'>
                <div className='pos-container'>
                    <label className='pos'>position:</label>
                    <span>{ position.join(', ')}</span>
                </div>
                {colorNames.map((name, index) => renderColorCh(name, colors[index], index))}
            </div>
        </div>
    );
};

export default Info;