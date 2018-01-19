import React, { Component } from 'react';
import { render } from 'react-dom';

export class Clock extends React.Component<{}, {}> {
    timer: any;

    state: any = {
        time: Date.now(),
        ampm: false
    };

    componentDidMount(): void {
        // update time every second
        this.timer = setInterval(() => {
            this.setState( {
                time: Date.now(),
                ampm: this.state.ampm
            } );
        }, 1000 );
    }

    componentWillUnmount(): void {
        // stop when not renderable
        clearInterval( this.timer );
    }
    
    setAmPm( e: React.ChangeEvent<HTMLInputElement> ): void {
        this.setState( {
            time: this.state.time,
            ampm: e.target.checked
        } );
    };

    render(): JSX.Element {
        let time = new Date( this.state.time ).toLocaleTimeString();
        return (
            <div>
                <span style={{ backgroundColor: 'green' }}>{time}</span>
                <input type="checkbox" checked={this.state.ampm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setAmPm(e) }}>AM/PM </input>{this.state.ampm ? 'Yes' : 'No'}
            </div>
        );
    }
}
