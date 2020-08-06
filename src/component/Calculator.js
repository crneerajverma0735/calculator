import React, { Component } from 'react'

class Calculator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: '0',
            maxLimit: '',
            showAll: "",
            res: false,
            equality: ""
        }
    }



    clear = () => {
        this.setState({
            input: '0',
            showAll: '',
            equality: "",
            maxLimit: '',
            res: false
        })
    }

    result = () => {
        const len = this.state.showAll.length;
        let value = 0;
        if (/[+/\-*]/.test(this.state.showAll[len - 1])) {
            value = eval(this.state.showAll.slice(0, len - 1));
            this.setState((prevState) => ({
                input: value,
                res: true,
                showAll: prevState.showAll.slice(0, len - 1) + "=" + value,
                equality: value
            }))
        }
        else {
            value = eval(this.state.showAll);
            this.setState((prevState) => ({
                input: value,
                res: true,
                showAll: prevState.showAll + "=" + value,
                equality: value
            }))
        }


        // let value = 0;
        // let storeNumber = [];
        // let storeOperator = [];


        // storeNumber = this.state.showAll.split(/[+/\-*]/);
        // storeOperator = this.state.showAll.split("").filter(item => /[+/\-*]/.test(item));
        // console.log(storeNumber)
        // for (let i = 0; i < storeNumber.length; i++) {
        //     value += Number(storeNumber[i])

        // }
    }

    operator = (e) => {
        const operator = e.target.textContent;
        const len = this.state.showAll.length;
        if (this.state.showAll[len - 1] === operator) {
            this.setState((prevState) => ({
                input: operator,
                showAll: prevState.showAll
            }))
        } else if (/[+/\-*]/.test(this.state.showAll[len - 1]) && /[+/\-*]/.test(this.state.showAll[len - 2])) {
            this.setState((prevState) => ({
                input: operator,
                showAll: prevState.showAll.slice(0, len - 2) + (operator === "x" ? "*" : operator)
            }))
        } else {
            this.setState((prevState) => ({
                input: operator,
                showAll: this.state.res ? (this.state.equality + (operator === 'x' ? "*" : operator)) : (operator !== 'x' ? prevState.showAll + operator : prevState.showAll + "*"),
                res: false
            }))
        }
    }

    putValueInInputField = (e) => {
        const content = e.target.textContent

        if (this.state.input.length > 23) {
            this.setState({
                maxLimit: "DIGIT LIMIT MET"
            })

            setTimeout(() => {
                this.setState({
                    maxLimit: ""
                })
            }, 1000)
        }
        else if (/[+/\-x]/.test(this.state.input)) {
            this.setState((prevState) => ({
                input: content,
                showAll: prevState.showAll + content
            }))
        }
        else if (/\./g.test(this.state.input) && content === '.') {
            return;
        }
        else if (this.state.input === 0 && content === '.') {
            this.setState({
                input: "0.",
                showAll: "0."
            })
        }
        else if (this.state.input === '0' && content !== ".") {
            this.setState({
                input: content,
                showAll: content
            })
        } else {
            this.setState((prevState) => ({
                input: prevState.input + content,
                showAll: prevState.showAll + content
            }))
        }



    }


    render() {
        return (
            <div className="col-11 col-sm-10 col-md-7 col-lg-6 col-xl-4 p-1 main" >
                <div className="row">
                    <div className="col-12 p-0 total-display" id="total-display">
                        <div className="row border border-0">
                            <div className="col-12 p-0 allInput">
                                {this.state.maxLimit ? "" : this.state.showAll}
                            </div>
                        </div>
                        <div className="row border border-0" id="display">
                            <div className="col-12 m-0 p-0 inputLower">
                                {this.state.maxLimit ? this.state.maxLimit : this.state.input}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-6 but" onClick={() => this.clear()} id="clear">
                        AC
                </div>

                    <div className="col-3 but" onClick={(e) => this.operator(e)} id="divide">
                        /
                </div>
                    <div className="col-3 but" onClick={(e) => this.operator(e)} id="multiply">
                        x
                </div>
                </div>
                <div className="row">
                    <div
                        className="col-3 but"
                        id="seven"
                        onClick={(e) => this.putValueInInputField(e)}>
                        7
                </div>
                    <div
                        className="col-3 but"
                        onClick={(e) => this.putValueInInputField(e)}
                        id="eight">
                        8
                </div>
                    <div className="col-3 but" onClick={(e) => this.putValueInInputField(e)} id="nine">
                        9
                </div>
                    <div className="col-3 but" onClick={(e) => this.operator(e)} id="subtract">
                        -
                </div>
                </div>
                <div className="row">
                    <div className="col-3 but" onClick={(e) => this.putValueInInputField(e)} id="four">
                        4
                </div>
                    <div className="col-3 but" onClick={(e) => this.putValueInInputField(e)} id="five">
                        5
                </div>
                    <div className="col-3 but" onClick={(e) => this.putValueInInputField(e)} id="six">
                        6
                </div>
                    <div className="col-3 but" onClick={(e) => this.operator(e)} id="add">
                        +
                </div>
                </div>
                <div className="row border border-0">
                    <div className="col-9 p-0">
                        <div className="row">
                            <div className="col-4 but" onClick={(e) => this.putValueInInputField(e)} id="one">
                                1
                        </div>
                            <div className="col-4 but" onClick={(e) => this.putValueInInputField(e)} id="two">
                                2
                        </div>
                            <div className="col-4 but" onClick={(e) => this.putValueInInputField(e)} id="three">
                                3
                        </div>

                        </div>
                        <div className="row">
                            <div className="col-8 but" onClick={(e) => this.putValueInInputField(e)} id="zero">
                                0
                        </div>
                            <div className="col-4 but" onClick={(e) => this.putValueInInputField(e)} id="decimal">
                                .
                        </div>
                        </div>
                    </div>
                    <div className="col-3 but p-0" onClick={() => this.result()} id="equals">
                        =
                </div>
                </div>
            </div>
        )
    }
}

export default Calculator
