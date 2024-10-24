import { useState, useRef, FormEvent } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// Mock data for request types
const requestsMock = [
  { name: 'Request 1', id: '37f64171-15ea-4e67-a943-473a0dea2b5b' },
  { name: 'Request 2', id: '48g75282-26fb-5f78-b054-584b1efb3c6c' },
];

export default function QuestionCreate() {
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string>('');
  const [conditions, setConditions] = useState<string[]>(['']);

  const handleAddCondition = () => {
    setConditions([...conditions, '']);
  };

  const handleConditionChange = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = value;
    setConditions(newConditions);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      questionText: questionTextRef.current?.value || '',
      requestId: selectedRequestId,
      conditions: conditions.filter(condition => condition.trim() !== ''),
    };
    console.log('Form Data:', formData);
  };

  return (
    <div className='mx-auto max-w-4xl space-y-6 p-6'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Create Question</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='questionText'>Question Text</Label>
          <Textarea
            id='questionText'
            ref={questionTextRef}
            placeholder='Enter your question here'
            className='min-h-[100px]'
          />
        </div>

        <div className='space-y-2'>
          <Label>Conditions</Label>
          {conditions.map((condition, index) => (
            <Input
              key={index}
              value={condition}
              onChange={e => handleConditionChange(index, e.target.value)}
              placeholder={`Condition ${index + 1}`}
              className='mb-2'
            />
          ))}
          <Button type='button' onClick={handleAddCondition} variant='outline'>
            Add Condition
          </Button>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='requestId'>Request ID</Label>
          <Select onValueChange={setSelectedRequestId}>
            <SelectTrigger>
              <SelectValue placeholder='Select a request' />
            </SelectTrigger>
            <SelectContent>
              {requestsMock.map(request => (
                <SelectItem key={request.id} value={request.id}>
                  {request.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type='submit' className='h-12 px-10'>
          Create
        </Button>
      </form>
    </div>
  );
}
