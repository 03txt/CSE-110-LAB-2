import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   

      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });
   });

   describe("deletes sticky", () =>
   {
    test("deletes an existing note", () => {
        render(<StickyNotes />);
    
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
    
        fireEvent.change(createNoteTitleInput, { target: { value: "Note to Delete" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Content to Delete" } });
        fireEvent.click(createNoteButton);
    
        const noteToDelete = screen.getByText("Note to Delete");
        expect(noteToDelete).toBeInTheDocument();
    
        const deleteButtons = screen.getAllByText("x"); // Assuming the delete button is an 'x'

        deleteButtons.forEach(button => {
            fireEvent.click(button);
          });
      
          // Check that no notes are in the document
          expect(screen.queryByText("danias first note")).not.toBeInTheDocument();
          expect(screen.queryByText("test note 2")).not.toBeInTheDocument();
        });
   });

   test("displays 'No Notes' when all notes are deleted", () => {
    render(<StickyNotes />);
    
    // Assume there are initial notes, now delete them one by one
    const deleteButtons = screen.getAllByText("x");
    deleteButtons.forEach(button => fireEvent.click(button));
    
    const noNotesMessage = screen.getByText(/No Notes/i);
    expect(noNotesMessage).toBeInTheDocument();
  });

