import { h, render, Component } from 'preact';
import { bind } from 'decko';

export default class Clock extends Component<any, any> {
    timer: any;

    constructor() {
        super();
        // set initial time:
        this.state = {
            time: Date.now(),
            ampm: false
        };
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now(),
                ampm: this.state.ampm });
        }, 1000);
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }
    
    @bind
    setAmPm(e: Event) {
        this.setState({
            time: this.state.time,
            ampm: (e.target as HTMLInputElement).checked
        });
    };

    render(props: any, state: any) {
        let time = new Date(state.time).toLocaleTimeString();
        return (<div>
                    <span style="background-color: green;">{ time }</span>
                    <input type="checkbox" checked={state.ampm} onChange={this.setAmPm}>AM/PM </input>{state.ampm ? 'Yes': 'No'}
            </div>);
    }
}
