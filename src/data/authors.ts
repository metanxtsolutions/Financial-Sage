// The people who write and review what the site publishes.
//
// THIS LIST IS EMPTY ON PURPOSE.
// Everything that uses it is built and wired: the byline and "Reviewed by" line
// on guides, Person schema with credentials, article:author in Open Graph, and
// the "Who writes and reviews our guides" section on /about. None of it renders
// until a real person is added here, and until then guides are attributed to
// the firm, exactly as before.
//
// It was left empty rather than filled with a plausible name because a named
// expert is a claim a reader and a search engine will both act on. An invented
// one, or a real one with credentials they do not hold, is the kind of thing
// that gets a site's entire authorship signal discounted, and in a regulated
// field it is simply misrepresentation.
//
// TO TURN IT ON
// 1. Add the person below. Only what is true and checkable: a membership
//    number that resolves in the ICAI directory is worth more than an adjective.
// 2. Set `defaultAuthorId` to make them the byline on every guide, or name them
//    per guide with `author:` in the guide's frontmatter.
// 3. For a guide they have actually read and approved, add to its frontmatter:
//        reviewedBy: "<their id>"
//        reviewed: "YYYY-MM-DD"
//    There is no site-wide default for review, deliberately. "Reviewed by" is a
//    statement about one page on one day.

export interface Author {
  /** URL-safe. Becomes the anchor on /about (`/about#<id>`) and the schema @id. */
  id: string;
  name: string;
  /** Their professional title, e.g. "Chartered Accountant". */
  jobTitle: string;
  /**
   * Qualifications and memberships, each one checkable. For example:
   * "Fellow member, Institute of Chartered Accountants of India (membership no. 000000)".
   */
  credentials: string[];
  /** Two or three sentences: what they do and for how long. No superlatives. */
  bio: string;
  /** Subjects they can be cited on, e.g. "GST registration", "Input tax credit". */
  knowsAbout: string[];
  /** Profiles that confirm who they are: LinkedIn, a professional directory entry. */
  sameAs: string[];
}

export const authors: Author[] = [
  // {
  //   id: "firstname-lastname",
  //   name: "",
  //   jobTitle: "",
  //   credentials: [""],
  //   bio: "",
  //   knowsAbout: ["GST registration", "GST return filing"],
  //   sameAs: ["https://www.linkedin.com/in/..."],
  // },
];

/** The byline on any guide that does not name its own author. null means the firm. */
export const defaultAuthorId: string | null = null;

export function getAuthor(id: string): Author {
  const author = authors.find((a) => a.id === id);
  if (!author) {
    throw new Error(
      `Unknown author "${id}". Known authors: ${authors.map((a) => a.id).join(", ") || "(none yet, see src/data/authors.ts)"}`,
    );
  }
  return author;
}

export function authorPath(author: Author): string {
  return `/about#${author.id}`;
}
