import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Pencil, Trash2, CirclePlus } from 'lucide-react';

import { Question } from '../types';
import { useQuestions } from '../store/queries';

function QuestionList() {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { data: questions, isLoading, isError } = useQuestions();

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleDelete = (questionId: string) => {
    console.log(`Delete question with id: ${questionId}`);
  };

  const handleSaveEdit = () => {
    if (editingQuestion) {
      console.log(`Save edited question: ${JSON.stringify(editingQuestion)}`);
      setEditingQuestion(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching questions</div>;

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>Questions</CardTitle>
          <Button>
            New <CirclePlus />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {questions?.map(question => (
          <div
            key={question.id}
            className='flex items-center justify-between border-b py-2 last:border-b-0'
          >
            <span>{question.questionText}</span>
            <div className='space-x-2'>
              <Button variant='outline' size='icon' onClick={() => handleEdit(question)}>
                <Pencil className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='icon' onClick={() => handleDelete(question.id)}>
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      <Dialog open={!!editingQuestion} onOpenChange={() => setEditingQuestion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <Label htmlFor='questionText'>Question Text</Label>
            <Input
              id='questionText'
              value={editingQuestion?.questionText || ''}
              onChange={e =>
                setEditingQuestion(prev =>
                  prev ? { ...prev, questionText: e.target.value } : null,
                )
              }
              className='mt-2'
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Wrap the component with QueryClientProvider
export default QuestionList;
