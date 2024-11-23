export class Word {
  id: string;
  isSaved: boolean;
  text: string;
  transcription: string;
  translation: string;
  image?: string;
  definition: string;
  examples: string[];

  constructor(initializer: any) {
    this.id = initializer.id;
    this.isSaved = initializer.isSaved;
    this.text = initializer.text;
    this.transcription = initializer.transcription;
    this.translation = initializer.translation;
    this.definition = initializer.definition;
    this.examples = initializer.examples;
    if (initializer.image) this.image = initializer.image;
  }
}
