# Contributing

## Testing

This project uses **T**est **D**riven **D**evelopment (or **TDD** for short). In short, this means that test cases are
_before_ any production code is written. The test case(s) fail, and production code is added until they pass. The idea
behind this is to make sure that only the _bare minimum_ production code is ever written as well as ensureing that any
code that _is_ written is covered by tests.

**Note:** Any and all code must be covered by passing tests to be considered for merge. You can generate a coverage
report using `npm run test && npm run-script coverage:html`

Coverage reports will also be automatically generated and attached to pull requests.

Our tests are written using [Mocha](https://mochajs.org/) `describe` and `it` functions. This helps to ensure that test
cases are written in plain english to ensure the clearest possible output when running tests. Please see below for some
examples

### ❌ No

```ts
describe('Door', () => {
    const d = new Door();
    describe('handle', () => {
        it('works', () => {
            d.turnHandle();
            expect(d.state).to.equal(Door.STATE_OPEN);
        });
    });
});
```

#### Analysis

This doesn't look too bad on the surface, except that it's impossible to tell what behaviour
we're expecting from our door handle or what it's supposed to do. What does a "working" door handle look like? What
about the error conditions etc.

A good test case should mimic the way that the unit will be used and should be named as such.
In this instance - "door handle works" doesn't tell us very much about how this door handle is supposed to work

### ❌ No

```ts
describe('A door', () => {
    const d = new Door();
    describe('handle', () => {
        it('turnHandle', () => {
            d.turnHandle();
            expect(d.state).to.equal(Door.STATE_OPEN);
        });
    });
});
```

#### Analysis

This is slightly better in that it makes reference to the fact that we're turning the handle.
However, the naming of the test suggests that it was probably written _after_ the production code not _before_ since
it's naming is tightly coupled to the implementation, rather than the general scenario.

### ✔️ Yes

```ts
describe('Door', () => {
    const d = new Door();
    describe('handle', () => {
        it('unlocks the door when turned', () => {
            d.turnHandle();
            expect(d.state).to.equal(Door.STATE_OPEN);
        });
    });
});
```

#### Analysis

This one is much better as it describes the scenario we expect to happen (i.e: turning a door
handle opens the door). This also means that if this test ever fails for some reason - we
will get a much more informative error message about what went wrong.

### Further Reading/Watching

Most of the principles practices for test structuring/naming are derivied from [this talk by Kevlin Henney](https://www.youtube.com/watch?v=azoucC_fwzw) where he discusses the merits of test structuring.

---

## Code of Conduct

Please note we have a code of conduct, please follow it in all your interactions with the project.

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making
participation in our project and our community a harassment-free experience for everyone, regardless of age, body size,
disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race,
religion, or sexual identity and orientation.

### Our Standards

#### Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

#### Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits,
issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any
contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the
project or its community. Examples of representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed representative at an online or
offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team.
All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate
to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an
incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent
repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at
[http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
