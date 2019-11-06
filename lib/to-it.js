'use babel';

import ToItView from './to-it-view';
import { CompositeDisposable } from 'atom';

export default {

  toItView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.toItView = new ToItView(state.toItViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.toItView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'to-it:toggle': () => this.convert()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.toItView.destroy();
  },

  serialize() {
    return {
      toItViewState: this.toItView.serialize()
    };
  },

  convert() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText().split("\n")
      selection.forEach(function(item){
              editor.insertText( `it '${item}', :testId =>'', :story => '' do |e|
end\n`)
           })
    }
  }

};
