import * as React from 'react';

import { AppModel } from '../../models/AppModel.ts';
import * as Constants from '../../Constants.ts';

import { PageContent } from './common/PageContent.tsx';
import { LinearTimeline } from './common/LinearTimeline.tsx';

export class PageByName extends React.Component<any, any> {

    public state: any;
    public model: any;

    constructor(props: any) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = new AppModel();
        this.updateDatasource(this.props.params.name);
    }

    public componentWillReceiveProps(nextProps: any) {
        this.updateDatasource(nextProps.params.name);
    }

    public render() {
        if (this.state.error) {
            return (
                <div>An error occurred</div>
            );
        }

        if (this.state.datasource === null) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                Page: {this.props.params.name}

                <PageContent datasource={this.state.datasource} datakey="page" />

                History:

                <LinearTimeline datasource={this.state.datasource} datakey="entries" />
            </div>
        );
    }

    private updateDatasource(name: string) {
        this.model.getPageByName(name)
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ error: true }); });
    }

}